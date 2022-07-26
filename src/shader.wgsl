//Vertex Shader

struct Output {
    @builtIn(position) Position : vec4<f32>;
    @location(0) vColor : vec4<f32>;
};

@stage(vertex)
fn vs_main(@builtIn(vertex_index) VertexIndex : v32) -> Output {
    var pos = array<vec2<f32>, 3>(
        vec2<f32>(0.0, 0.5),
        vec2<f32>(-0.5, -0.5),
        vec2<f32>(0.5, -0.5),
    );

    var color = array<vec3<f32>, 3>(
        vec3<f32>(1.0, 0.0, 0.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(0.0, 0.0, 0.1),
    );

    var ouput : Output;
    output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
    ouput.vColor = vec4<f32>(color[VertexIndex], 1.0);
    return output;
}

// fragment shader

@stage(fragment)
fn fs_main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {
    return vColor;
}