---
title: Ansible
---

## Misc

#### Resources
- Sample code:
    - [https://galaxy.ansible.com/list](https://galaxy.ansible.com/list)
    - [https://github.com/ansible/ansible-examples](https://github.com/ansible/ansible-examples)
    - [https://infrastructure.fedoraproject.org/cgit/ansible.git/tree/](https://infrastructure.fedoraproject.org/cgit/ansible.git/tree/)
    - [https://github.com/geerlingguy/ansible-for-devops](https://github.com/geerlingguy/ansible-for-devops)
    - [https://github.com/lorin/ansiblebook](https://github.com/lorin/ansiblebook)


#### Some common modules:
- [command](http://docs.ansible.com/ansible/command_module.html)
- [copy](http://docs.ansible.com/ansible/copy_module.html)
- [service](http://docs.ansible.com/ansible/service_module.html)


#### Show the output of a command
[http://stackoverflow.com/a/20981211/399105](http://stackoverflow.com/a/20981211/399105)

Use the last two lines here:

    - name: Copy some file
      copy:
        src: /path/to/some/file
        dest: /path/to/some/file
      register: result

    - debug: var=result.stdout_lines

**Note:** when using debug in a handler, you must provide it a name and call the handler directly since handlers aren't run automatically



## Organization

#### Folder structure
See [Ansible Best Practices](http://docs.ansible.com/ansible/playbooks_best_practices.html)


#### Operational tasks
For operational tasks (restart a service, install a patch, etc), don't put them in roles. Instead put the tasks directly into the playbooks.



## Global directives
These are directives that can be applied to any module

#### [changed_when](http://docs.ansible.com/ansible/playbooks_error_handling.html#overriding-the-changed-result)
Override the conditions determining whether a task was changed or not

This can also be used to never (or always) report a task as changed:

    # Don't report this as changed
    changed_when: no


#### [delegate_to](http://docs.ansible.com/ansible/playbooks_delegation.html#delegation)
Used to run a task on a specific server. Pair with run_once to make sure the task only gets run once per play.

For example, to limit a task to the first server in a group:

    - name: Some task
      ...
      delegate_to: "{{ groups['my_group'][0] }}"
      run_once: yes


#### [failed_when](http://docs.ansible.com/ansible/playbooks_error_handling.html#controlling-what-defines-failure)
Override the conditions determining whether a task has failed or not


#### [ignore_errors](http://docs.ansible.com/ansible/playbooks_error_handling.html#ignoring-failed-commands)
Keep going if the task fails


#### [notify](http://docs.ansible.com/ansible/playbooks_intro.html#handlers-running-operations-on-change)
Run a handler if the task was changed


#### [register](http://docs.ansible.com/ansible/playbooks_conditionals.html#register-variables)
Register the result of a command to a variable. The variable is a dict that has a lot of useful values, such as:

    "changed": true,
    "cmd": "if ! sudo /sbin/service tomcat6 status; then sudo /sbin/service tomcat6 start; fi",
    "rc": 0,
    "stderr": "",
    "stdout": "tomcat6 is stopped\u001b[60G[\u001b[0;32m  OK  \u001b[0;39m]\r\nStarting tomcat6: \u001b[60G[\u001b[0;32m  OK  \u001b[0;39m]",
    "stdout_lines": [
        "tomcat6 is stopped\u001b[60G[\u001b[0;32m  OK  \u001b[0;39m]",
        "Starting tomcat6: \u001b[60G[\u001b[0;32m  OK  \u001b[0;39m]"
    ],


#### [run_once](http://docs.ansible.com/ansible/playbooks_delegation.html#run-once)
Only run the task once per play.

**Note:** this will always run on the first host in the play, which may change if you use --limit. To make sure it always runs on one specific host, use run_once with delegate_to.


#### [when](http://docs.ansible.com/ansible/playbooks_conditionals.html#the-when-statement)
Run a task based on a condition


#### [with_items](http://docs.ansible.com/ansible/playbooks_loops.html#standard-loops)
Pass a list of items to be iterated over in a task



## Templates

#### Adding sections to a file conditionally
**Note:** Make sure all blank lines and template lines `({% raw %}{% %}{% endraw %}`) have no trailing whitespace!

    {% raw %}{% if inventory_hostname in ['idp1.example.org', 'idp2.example.org'] %}{% endraw %}
    <!-- Metadata for sp1.example.org -->
    <metadata:MetadataProvider id="sp1.example.org" xsi:type="metadata:FileBackedHTTPMetadataProvider"
        metadataURL="https://sp1.example.org/Shibboleth.sso/Metadata"
        backingFile="/opt/shibboleth-idp/metadata/sp1.example.org-metadata.xml" />

    {% raw %}{% endif %}{% endraw %}
    <!-- Metadata for sp2.example.org -->



## Variables

#### groups['*group_name*']
All of the hosts in a particular group matched by the inventory file for the current play


#### inventory_file
The relative path to the inventory file used by the current play

Ex:

    ansible-playbook -i inventory/development...
    "inventory_file": "inventory/development"


#### inventory_hostname
The hostname of the current server


#### play_hosts
All of the hosts included in the current play



## Examples

#### Remove a file if another file exists

    - stat:
        path: /etc/pki/tls/certs/ThawteSSLCAG2.crt
      register: thawtesslcag2

    - file:
        path: ~/ThawteSSLCAG2.crt
        state: absent
      when: thawtesslcag2.stat.exists
