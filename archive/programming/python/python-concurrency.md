---
title: Python concurrency
---

#### use multiprocessing

see:

- [http://docs.python.org/library/multiprocessing.html](http://docs.python.org/library/multiprocessing.html)
- [http://wiki.python.org/moin/Concurrency](http://wiki.python.org/moin/Concurrency)

#### creating one process

```
import multiprocessing
p = multiprocessing.Process(target=some_function, args=[function_arg1, function_arg2])
p.start()
# joins the process, keeping the script from continuing past this point (blocking)
p.join()
```

#### creating a pool of processes

```
import multiprocessing
# creates as many processes as the system has processors, according to multiprocessing.cpu_count()
pool = multiprocessing.Pool()
# alternative: pool = multiprocessing.Pool(processes=8)
result = pool.map_async(some_function, list_to_process)
# returns a list of the return values of the processes
print result.get()
```
