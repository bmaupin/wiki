---
title: Google Cloud Platform (GCP)
---

## Google Cloud Shell

#### Connect to Google Cloud Shell
1. Set up gcloud command line

    [https://cloud.google.com/compute/docs/gcloud-compute/](https://cloud.google.com/compute/docs/gcloud-compute/)

2. Start up a Cloud Shell instance and connect to it

        gcloud alpha cloud-shell ssh

    If you get this error:

        sign_and_send_pubkey: signing failed: agent refused operation
        Permission denied (publickey).

    Try running this command:

        ssh-add
