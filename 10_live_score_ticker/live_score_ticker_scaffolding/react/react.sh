if [ -d "/home/coder/project/workspace/live_score_ticker/src/tests/" ]
    then
        rm -r /home/coder/project/workspace/live_score_ticker/src/tests;
fi
cp -r /home/coder/project/workspace/react/tests /home/coder/project/workspace/live_score_ticker/src/;
cd /home/coder/project/workspace/live_score_ticker/;
source /usr/local/nvm/nvm.sh
nvm use 16
export CI=true;
if [ -d "/home/coder/project/workspace/live_score_ticker/node_modules" ]; then
    cd /home/coder/project/workspace/live_score_ticker/
    npx react-scripts test --verbose --testPathPattern=src/tests 2>&1;
else
    cd /home/coder/project/workspace/live_score_ticker/
    yes | npm install
    npx react-scripts test --verbose --testPathPattern=src/tests 2>&1;
fi
