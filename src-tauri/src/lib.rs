use std::fs;
use std::path::PathBuf;

const YOUYOU_DIR: &str = ".youyou";

const DEFAULT_AGENT_MD: &str = r#"# YouYou Agent Configuration

This file defines agent behavior and guidelines for the YouYou system.

## Instructions
- Follow user instructions precisely.
- Be helpful, clear, and concise.
"#;

const DEFAULT_SOUL_MD: &str = r#"# YouYou Soul

This file defines the personality and core values of the YouYou agent.

## Personality
- Friendly and approachable
- Precise and reliable
- Creative when appropriate
"#;

/// Represents the initialization status of the ~/.youyou directory.
#[derive(serde::Serialize, Clone)]
pub struct YouyouInitStatus {
    pub path: String,
    pub created: bool,
    pub directories: Vec<String>,
    pub files: Vec<String>,
}

/// Returns the path to ~/.youyou
fn youyou_home() -> PathBuf {
    dirs::home_dir()
        .expect("could not resolve home directory")
        .join(YOUYOU_DIR)
}

/// Ensure the ~/.youyou directory and its structure exist.
fn ensure_youyou_dir() -> YouyouInitStatus {
    let base = youyou_home();

    if base.exists() {
        return YouyouInitStatus {
            path: base.to_string_lossy().to_string(),
            created: false,
            directories: vec![],
            files: vec![],
        };
    }

    fs::create_dir_all(&base).expect("failed to create .youyou directory");

    let subdirs = ["skills", "tools", "plugins", "prompt"];
    let mut created_dirs = Vec::new();
    let mut created_files = Vec::new();

    for dir in &subdirs {
        fs::create_dir_all(base.join(dir)).expect("failed to create subdirectory");
        created_dirs.push(dir.to_string());
    }

    fs::write(base.join("AGENT.md"), DEFAULT_AGENT_MD).expect("failed to write AGENT.md");
    created_files.push("AGENT.md".to_string());

    fs::write(base.join("SOUL.md"), DEFAULT_SOUL_MD).expect("failed to write SOUL.md");
    created_files.push("SOUL.md".to_string());

    YouyouInitStatus {
        path: base.to_string_lossy().to_string(),
        created: true,
        directories: created_dirs,
        files: created_files,
    }
}

/// Tauri command: get the init status of ~/.youyou
#[tauri::command]
fn get_youyou_status() -> YouyouInitStatus {
    ensure_youyou_dir()
}

/// Tauri command: list contents of a subdirectory under ~/.youyou
#[tauri::command]
fn list_youyou_dir(subdir: String) -> Result<Vec<String>, String> {
    let path = youyou_home().join(&subdir);
    if !path.exists() {
        return Err(format!("Directory not found: {}", subdir));
    }
    let entries = fs::read_dir(&path).map_err(|e| e.to_string())?;
    let names: Vec<String> = entries
        .filter_map(|e| e.ok())
        .map(|e| e.file_name().to_string_lossy().to_string())
        .collect();
    Ok(names)
}

/// Tauri command: read a file under ~/.youyou
#[tauri::command]
fn read_youyou_file(filepath: String) -> Result<String, String> {
    let path = youyou_home().join(&filepath);
    if !path.exists() {
        return Err(format!("File not found: {}", filepath));
    }
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            // Initialize ~/.youyou on app startup
            let status = ensure_youyou_dir();
            if status.created {
                log::info!("Created ~/.youyou directory at {}", status.path);
            } else {
                log::info!("~/.youyou directory already exists at {}", status.path);
            }

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_youyou_status,
            list_youyou_dir,
            read_youyou_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
