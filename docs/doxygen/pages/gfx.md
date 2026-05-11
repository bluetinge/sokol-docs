@page guide_gfx sokol_gfx.h Guide

Quick entry points for `sokol_gfx.h`.

See also: [file reference](sokol__gfx_8h.html), [project README](md__r_e_a_d_m_e.html)

## Setup and shutdown

- [sg_setup()](@ref sg_setup) - initialize sokol-gfx with backend environment details, pool sizes, and logger callbacks.
- [sg_shutdown()](@ref sg_shutdown) - release global renderer state and any resources still owned by sokol-gfx.
- [sg_isvalid()](@ref sg_isvalid) - check whether initialization succeeded and the API is ready to use.
- [sg_query_backend()](@ref sg_query_backend) - report which backend was compiled and initialized.
- [sg_query_desc()](@ref sg_query_desc) - inspect the effective `sg_desc` after default values have been patched in.

## Resource creation

- [sg_make_buffer()](@ref sg_make_buffer) - create vertex, index, storage, or uniform-buffer resources.
- [sg_make_image()](@ref sg_make_image) - create textures or render-target images.
- [sg_make_sampler()](@ref sg_make_sampler) - create a sampler object that controls texture filtering and addressing.
- [sg_make_shader()](@ref sg_make_shader) - create a shader resource from backend-specific shader code and reflection data.
- [sg_make_pipeline()](@ref sg_make_pipeline) - create the draw or compute pipeline state that ties shaders, layouts, and fixed-function state together.
- [sg_make_view()](@ref sg_make_view) - create a typed view into an image or buffer resource.

## Render and compute passes

- [sg_begin_pass()](@ref sg_begin_pass) - start a swapchain, offscreen, or compute pass.
- [sg_apply_pipeline()](@ref sg_apply_pipeline) - bind the pipeline state for subsequent draw or dispatch calls.
- [sg_apply_bindings()](@ref sg_apply_bindings) - bind vertex buffers, index buffers, views, and samplers expected by the current shader.
- [sg_apply_uniforms()](@ref sg_apply_uniforms) - upload one uniform block's data for the current pass.
- [sg_draw()](@ref sg_draw) - issue a draw call using the currently bound pipeline and resources.
- [sg_dispatch()](@ref sg_dispatch) - launch a compute workload in the current compute pass.
- [sg_end_pass()](@ref sg_end_pass) - end the current render or compute pass.
- [sg_commit()](@ref sg_commit) - submit the current frame to the backend.

## Dynamic updates and queries

- [sg_update_buffer()](@ref sg_update_buffer) - replace the contents of a dynamic or stream buffer once per frame.
- [sg_append_buffer()](@ref sg_append_buffer) - append variable-size chunks to a dynamic buffer and receive the byte offset back.
- [sg_update_image()](@ref sg_update_image) - replace some or all pixels in a dynamic image.
- [sg_query_features()](@ref sg_query_features) - inspect optional backend features such as compute, MSAA resolve, or storage resources.
- [sg_query_limits()](@ref sg_query_limits) - inspect runtime limits like maximum image sizes or supported draw features.
- [sg_query_pixelformat()](@ref sg_query_pixelformat) - check how a specific pixel format can be sampled, rendered to, filtered, or blended.

## Deferred initialization

- [sg_alloc_buffer()](@ref sg_alloc_buffer) - reserve a buffer handle now and initialize it later.
- [sg_alloc_image()](@ref sg_alloc_image) - reserve an image handle now and initialize it later.
- [sg_alloc_shader()](@ref sg_alloc_shader) - reserve a shader handle now and initialize it later.
- [sg_init_buffer()](@ref sg_init_buffer) - attach a descriptor to a previously allocated buffer handle.
- [sg_init_image()](@ref sg_init_image) - attach a descriptor to a previously allocated image handle.
- [sg_init_shader()](@ref sg_init_shader) - attach a descriptor to a previously allocated shader handle.
