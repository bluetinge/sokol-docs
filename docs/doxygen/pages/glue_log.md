@page guide_glue_log sokol_glue.h and sokol_log.h Guide

Quick entry points for the small support headers.

See also: [sokol_glue.h reference](sokol__glue_8h.html), [sokol_log.h reference](sokol__log_8h.html), [project README](md__r_e_a_d_m_e.html)

## Glue helpers

- [sglue_environment()](@ref sglue_environment) - build the `sg_environment` block for `sg_setup()` from the current `sokol_app.h` backend state.
- [sglue_swapchain()](@ref sglue_swapchain) - build the `sg_swapchain` for the current frame's default render target.

## Default logging

- [slog_func()](@ref slog_func) - default logger callback that routes sokol diagnostics to stderr or the platform debug console.
