console.log('module.js');

async function start() {
    await Promise.resolve('async work!').then(src => console.log(src));
}

start();
