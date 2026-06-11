#!/bin/bash
while true; do
  cd /home/z/my-project
  if ! pgrep -f "serve out" > /dev/null 2>&1; then
    npx serve out -p 3000 -s >> /tmp/serve.log 2>&1 &
    sleep 3
  fi
  sleep 5
done
