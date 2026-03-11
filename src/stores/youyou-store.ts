import { create } from "zustand";
import { invoke } from "@tauri-apps/api/core";

export interface YouyouInitStatus {
  path: string;
  created: boolean;
  directories: string[];
  files: string[];
}

interface YouyouState {
  status: YouyouInitStatus | null;
  loading: boolean;
  error: string | null;
  activeSection: string | null;
  sectionFiles: string[];
  fileContent: string | null;

  fetchStatus: () => Promise<void>;
  listDir: (subdir: string) => Promise<void>;
  readFile: (filepath: string) => Promise<void>;
  setActiveSection: (section: string | null) => void;
}

export const useYouyouStore = create<YouyouState>((set) => ({
  status: null,
  loading: false,
  error: null,
  activeSection: null,
  sectionFiles: [],
  fileContent: null,

  fetchStatus: async () => {
    set({ loading: true, error: null });
    try {
      const status = await invoke<YouyouInitStatus>("get_youyou_status");
      set({ status, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  listDir: async (subdir: string) => {
    set({ loading: true, error: null });
    try {
      const files = await invoke<string[]>("list_youyou_dir", { subdir });
      set({ sectionFiles: files, loading: false });
    } catch (e) {
      set({ sectionFiles: [], error: String(e), loading: false });
    }
  },

  readFile: async (filepath: string) => {
    set({ loading: true, error: null });
    try {
      const content = await invoke<string>("read_youyou_file", { filepath });
      set({ fileContent: content, loading: false });
    } catch (e) {
      set({ fileContent: null, error: String(e), loading: false });
    }
  },

  setActiveSection: (section: string | null) => {
    set({ activeSection: section, sectionFiles: [], fileContent: null });
  },
}));
