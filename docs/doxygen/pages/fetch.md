@page guide_fetch sokol_fetch.h Guide

Quick entry points for `sokol_fetch.h`.

See also: [file reference](sokol__fetch_8h.html), [project README](md__r_e_a_d_m_e.html)

## Setup and main loop integration

- [sfetch_setup()](@ref sfetch_setup) - initialize worker threads, request queues, and callbacks.
- [sfetch_shutdown()](@ref sfetch_shutdown) - stop workers and release fetch-system resources.
- [sfetch_valid()](@ref sfetch_valid) - check whether the fetch system is ready.
- [sfetch_dowork()](@ref sfetch_dowork) - pump callbacks and request state on the main thread.
- [sfetch_desc_t](@ref sfetch_desc_t) - setup descriptor for queue sizes, worker counts, and logger hooks.

## Requests

- [sfetch_send()](@ref sfetch_send) - submit a file request and receive a handle for later control.
- [sfetch_handle_valid()](@ref sfetch_handle_valid) - test whether a returned handle refers to a live request.
- [sfetch_cancel()](@ref sfetch_cancel) - cancel an in-flight request.
- [sfetch_pause()](@ref sfetch_pause) - temporarily pause reading or decoding work for a request.
- [sfetch_continue()](@ref sfetch_continue) - resume a paused request.

## Buffer ownership

- [sfetch_bind_buffer()](@ref sfetch_bind_buffer) - hand a buffer back to sokol-fetch so a callback can continue asynchronous loading.
- [sfetch_unbind_buffer()](@ref sfetch_unbind_buffer) - detach the current buffer from a response so ownership stays with the caller.
- [sfetch_max_path()](@ref sfetch_max_path) - maximum path length accepted by request descriptors.
- [sfetch_max_userdata_bytes()](@ref sfetch_max_userdata_bytes) - maximum inline user-data storage available per request.
