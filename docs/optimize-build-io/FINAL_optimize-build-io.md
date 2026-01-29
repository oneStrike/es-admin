# 构建优化项目总结

## 1. 项目背景
项目在进行构建（特别是 Docker 构建）时，由于内存占用过高（配置了 8GB Heap）且未限制并发，导致宿主机 I/O 飙升甚至系统死机。

## 2. 实施方案
- **内存降级**: 将 Node.js 堆内存限制从 8GB 降至 4GB (`--max-old-space-size=4096`)。
- **并发控制**: 限制 TurboRepo 并发数为 2 (`--concurrency=2`)。

## 3. 交付物
- 修改后的 `package.json`
- 修改后的 `apps/web-ele/Dockerfile`
- 文档:
  - `ALIGNMENT_optimize-build-io.md`
  - `CONSENSUS_optimize-build-io.md`
  - `ACCEPTANCE_optimize-build-io.md`

## 4. 结论
通过限制资源使用上限，确保构建过程在系统可承受范围内运行，消除了死机风险。
