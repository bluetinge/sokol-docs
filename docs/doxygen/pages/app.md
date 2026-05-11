@page guide_app sokol_app.h Guide

Quick entry points for `sokol_app.h`.

See also: [file reference](sokol__app_8h.html), [project README](readme.html)

## Startup and lifetime

- [sokol_main()](@ref sokol_main) - return the application descriptor that defines callbacks, window setup, and platform options.
- [sapp_run()](@ref sapp_run) - start the platform event loop with an explicit `sapp_desc`, mainly useful with `SOKOL_NO_ENTRY`.
- [sapp_quit()](@ref sapp_quit) - terminate the app as soon as the current frame finishes.
- [sapp_request_quit()](@ref sapp_request_quit) - request a quit that can still be vetoed from the event callback.
- [sapp_cancel_quit()](@ref sapp_cancel_quit) - cancel a pending quit request from inside the quit-requested event.

## Frame and environment

- [sapp_get_environment()](@ref sapp_get_environment) - query backend objects and default formats for initializing other sokol modules.
- [sapp_get_swapchain()](@ref sapp_get_swapchain) - fetch the current frame's swapchain attachments for rendering with `sg_begin_pass()`.
- [sapp_width()](@ref sapp_width) - current framebuffer width in pixels.
- [sapp_height()](@ref sapp_height) - current framebuffer height in pixels.
- [sapp_frame_duration()](@ref sapp_frame_duration) - smoothed frame time for animation and pacing.

## Events and input

- [sapp_consume_event()](@ref sapp_consume_event) - mark the current event as handled so higher-level code can skip default processing.
- [sapp_mouse_locked()](@ref sapp_mouse_locked) - check whether pointer lock is currently active.
- [sapp_lock_mouse()](@ref sapp_lock_mouse) - enable or disable relative mouse input where supported.
- [sapp_show_mouse()](@ref sapp_show_mouse) - show or hide the system cursor.
- [sapp_show_keyboard()](@ref sapp_show_keyboard) - request the onscreen keyboard on platforms that support it.

## Platform-specific helpers

- [sapp_is_fullscreen()](@ref sapp_is_fullscreen) - query whether the app is currently in fullscreen mode.
- [sapp_toggle_fullscreen()](@ref sapp_toggle_fullscreen) - toggle fullscreen mode on platforms that support it.
- [sapp_html5_fetch_dropped_file()](@ref sapp_html5_fetch_dropped_file) - read dropped-file contents on HTML5 after inspecting the drop event metadata.
