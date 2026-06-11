#!/bin/bash
while true; do
  cd /home/z/my-project
  node server-robust.mjs
  echo "Server died, restarting in 2 seconds..."
  sleep 2
done
