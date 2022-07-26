//libraries
import { checkWebGPU } from './helper';
import shader from './shader.wgsl';
//style
import './site.css';
//variables
const notSupported = 'Your current browser does not support WebGPU!';
const supported = '';

const CreateTriangle = async () => {
    const checkGPU = checkWebGPU();
    if(checkGPU.includes(notSupported)) {
        console.log(checkGPU);
        throw(notSupported);
    };

    const canvas = document.querySelector('#canvas-webgpu') as HTMLCanvasElement;
    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
    const device = await adapter?.requestDevice() as GPUDevice;
    const context = canvas.getContext('webgpu') as GPUCanvasContext;
    const format = 'bgra8unorm';
    context.configure({
        device: device,
        format: format
    });

    //destructured device object
    const {createRenderPipeline, createShaderModule, createCommandEncoder, queue} = device;

    //create a render pipeline
    const pipeline = createRenderPipeline({
        vertex: {
            module: createShaderModule({
                code: shader
            }),
            entryPoint: "vs_main"
        },
        fragment: {
            module: createShaderModule({
                code: shader
            }),
            entryPoint: "fs_main",
            targets: [{
                format: format
            }]
        },
        primitive: {
            topology: 'triangle-list'
        }
    });

    const commandEncoder = createCommandEncoder();
    //destructured context object
    const {getCurrentTexture} = context;
    const textureView = getCurrentTexture().createView();

    //destructured command encoder object
    const {beginRenderPass} = commandEncoder;
    const renderPass = beginRenderPass({
        colorAttachments: [{
            view: textureView,
            clearValue: {r: 0.2, g: 0.247, b: 0.314, a: 1.0}, 
            loadOp: 'clear',
            loadValue: {r: 0.2, g: 0.247, b: 0.314, a: 1.0},
            storeOp: 'store'
        }]
    });

    //destructured renderpass object 
    const {setPipeline, draw, end} = renderPass;
    setPipeline(pipeline);
    draw(3, 1, 0, 0);
    end();

    queue.submit([commandEncoder.finish()]);
}

CreateTriangle();

window.addEventListener('resize', () => {
    CreateTriangle();
});