const checkWebGPU = () => {
    //Function to check whether the user's browser supports WebGPU
    let result = 'Great, your current browser supports WebGPU!';
    const support = navigator.gpu;
    if (!support) {
        result = `
        Your current browser does not support WebGPU! 
        Make sure you are on a browser with WebGPU enabled.
        Currently WebGPU is supported on: 
        <a href="https://www.google.com/chrome/canary">Chrome Canary</a>
        with the flag "enable-unsafe-webgpu" enabled.
        See the <a href="https://github.com/gpuweb/wiki/Implementation-Status">Implementation Status</a> page for more details.
        Available on <a href="https://www.google.com/chrome">Chrome</a> as of May 2022.
        `
    }

    return result;
}

export {checkWebGPU};