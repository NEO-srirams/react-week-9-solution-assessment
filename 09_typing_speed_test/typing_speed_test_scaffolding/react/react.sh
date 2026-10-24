if [ -d "/home/coder/project/workspace/typing_speed_test/src/tests/" ]
    then
        rm -r /home/coder/project/workspace/typing_speed_test/src/tests;
fi
cp -r /home/coder/project/workspace/react/tests /home/coder/project/workspace/typing_speed_test/src/;
cd /home/coder/project/workspace/typing_speed_test/;
source /usr/local/nvm/nvm.sh
nvm use 16
export CI=true;
if [ -d "/home/coder/project/workspace/typing_speed_test/node_modules" ]; then
    cd /home/coder/project/workspace/typing_speed_test/
    npx react-scripts test --verbose --testPathPattern=src/tests 2>&1;
else
    cd /home/coder/project/workspace/typing_speed_test/
    yes | npm install
    npx react-scripts test --verbose --testPathPattern=src/tests 2>&1;
fi
