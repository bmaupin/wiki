---
title: Shell quick reference
---

#### Run a shell command repeatedly, tracking pass/fail

This is useful, for example, to run an intermittently failing test over and over to reproduce the failure and see if it's been fixed

```
pass=0; fail=0; for i in {1..20}; do if npm test -- server/lib/custom-session-store/custom-session-store.test.ts; then pass=$((pass + 1)); else fail=$((fail + 1)); fi; echo "pass=$pass"; echo "fail=$fail"; done
```
