if [ -d "/home/coder/project/workspace/auto_dismiss_toast/src/tests/" ]
    then
        rm -r /home/coder/project/workspace/auto_dismiss_toast/src/tests;
fi
cp -r /home/coder/project/workspace/react/tests /home/coder/project/workspace/auto_dismiss_toast/src/;
cd /home/coder/project/workspace/auto_dismiss_toast/;
source /usr/local/nvm/nvm.sh
nvm use 16
export CI=true;
if [ -d "/home/coder/project/workspace/auto_dismiss_toast/node_modules" ]; then
    cd /home/coder/project/workspace/auto_dismiss_toast/
    npx react-scripts test --verbose --testPathPattern=src/tests 2>&1;
else
    cd /home/coder/project/workspace/auto_dismiss_toast/
    yes | npm install
    npx react-scripts test --verbose --testPathPattern=src/tests 2>&1;
fi
