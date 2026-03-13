## 文档修改
对不起，我犯了一个很严重的问题，因为 youyou 是个无状态的 agent，所以他并不需要关心 .youyou 文件夹下的任何逻辑，包括 skills、tools 等等，这些都应该由使用者自行组装完毕后传递给 agent，然后 agent 在初始化时候注册。
所以请帮我把这些相关的内容都删除，agent 只需要关注自身内部逻辑的处理即可。
重新整理一份需求文档，输出在 ./specs/0002_youyou_demand.md 下，如果有什么问题，可以继续追问我

## 文档优化
./specs/0002_youyou_demand.md 已经基本没有什么问题了，但是还需要按以下几点优化下。

1. 不需要显示 Non-Goals，直接介绍我们需要实现的内容即可
2. 根据我们的方案，仔细阅读 ../codex 的代码，实现 2.1 和 2.2
  2.1 查看我们每个需求可以借鉴 codex 的哪些代码，把代码的具体位置标记出来
  2.2 找到哪些是 agent 运行时所必须的 system prompt，原样整理出来，整理完之后，再保留一份中文版本（需要严格翻译）

请你先按照上面的个要求优化文档，如果有问题及时追问我，我会和你商讨方案

## prompt 整理
请帮我详细整理一份 codex 使用所有 prompt 的过程，包含以下内容：
1. 这个 prompt 是静态内容还是动态生成
2. 它的内容摘要，它在 codex 代码中的位置
3. 它在什么时候插入到上下文传递给 LLM
4. 它的作用是什么，用来解决什么问题
5. 对于我的设计的 agent 来说，这个 prompt 需要我在 agent 内置，还是外部使用方来传入

整理的文档放在 ./specs/0004_codex_prompt.md 下

## 文档优化
@specs/0003_youyou_demand.md 请结合 @specs/0004_codex_prompt.md 的分析，修改文档内 prompt 相关的内容，并输出到                 
./spces/0005_youyou_demand.md 中

## 架构设计文档
请根据 ./specs/0005_youyou_demand.md 的需求文档，认真思考，出一份 agent 的整体架构设计文档，可以包含少量代码作为说明，设计要遵循 SOLID、KISS、YAGNI 原则，使用 clean 架构，输出到 ./specs/0006_youyou_agent_design.md 中

## codex review
specs/0005_youyou_demand.md 请你根据这个需求方案文档中的内容，对 specs/0006_youyou_agent_design.md 这个 agent架构设计文档进行 review 评审，并进行打分，满分 100 分。然后提出修改优化意见，优化意见输出到 specs/0007_youyou_agent_design_review_by_codex.md 中

## 优化文档
请仔细阅读 specs/0007_youyou_agent_design_review_by_codex.md 下的内容，做以下几点:
1. 如果它的建议是有效的，仔细思考，并且优化文档，如果有问题可以追问我
2. 如果它的建议是没有意义的，则不用理会

根据上面的要求，优化 ./specs/0006_youyou_agent_design.md