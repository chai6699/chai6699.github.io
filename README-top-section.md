# Federated Learning under Lossy Wireless Networks

![tests](https://github.com/chai6699/federated-learning-packet-loss/actions/workflows/tests.yml/badge.svg)
![python](https://img.shields.io/badge/python-3.11%20%7C%203.13-blue)
![licence](https://img.shields.io/badge/licence-MIT-green)

MSc dissertation, Newcastle University (2026). A PyTorch FedAvg simulator that studies how
gradient compression and client selection interact when updates travel over unreliable Wi-Fi
with a round deadline.

## Key finding

**Compression doesn't just save bandwidth; it decides which devices can take part.**
On a 5 Mbps link with a 2 s deadline, an uncompressed 4.58 MB update never arrives and training
never starts. With Top-k compression the same devices reach 93% accuracy, and across four
client-selection policies the accuracy spread falls from 16.4 to 2.3 percentage points.

![Compression rescue under weak Wi-Fi](figures/compression_rescue_multiseed.png)

| What | How |
|---|---|
| Three separate failure models | Independent loss, rate-matched Gilbert–Elliott burst loss, bandwidth-limited deadline misses |
| Fair comparisons | Every random draw is a pure function of (seed, client, round, stream), so compared arms see identical channels |
| Trustworthy results | 50 unit tests; every table regenerated from archived runs by script |
| Honest reporting | Eight defects found in a self-audit, documented in [CHANGELOG.md](CHANGELOG.md) |

## Reproduce in three commands

```bash
pip install -r requirements.txt
python -m pytest tests/ -q
python verify_reproducibility.py
```

---
*(Paste your existing README content below this line, starting from the Layout section.)*
