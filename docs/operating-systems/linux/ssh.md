---
title: SSH
---

## Troubleshooting

#### Terminal prompts for SSH passphrase instead of GNOME Keyring

1. Make sure public key filenames are correct

    **Note**: Public key filenames should be equal to the private key filename plus a .pub extension, otherwise they won't be picked up by ssh-agent upon login.

    ```
    $ ls -1 ~/.ssh/*.pub
    google_compute_engine.pub
    id_rsa.github.pub
    id_rsa.pub
    ```

1. Ensure files and folders have proper permissions

    1. Make sure the .ssh folder has proper permissions
        ```
        chmod 700 ~/.ssh
        ```

    1. Make sure each private key has proper permissions

        ```
        chmod 600 ~/.ssh/id_rsa
        ```

        (Do the same for any other private SSH keys in ~/.ssh)

    1. Make sure each private key has proper permissions

        ```
        chmod 644 ~/.ssh/*.pub
        ```

1. Set up ~/.ssh/config so the correct private key will be used for a particular host

    ```
    Host github.com
        IdentityFile ~/.ssh/id_rsa.github
    ```

1. Log out and log back in

1. All keys in ~/.ssh should be automatically picked up and added to ssh-agent

    Verify using `ssh-add -l` or `ssh-add -L`
