@page guide_args sokol_args.h Guide

Quick entry points for `sokol_args.h`.

See also: [file reference](sokol__args_8h.html), [project README](readme.html)

## Setup and iteration

- [sargs_setup()](@ref sargs_setup) - initialize argument parsing from native argv data or the browser query string.
- [sargs_shutdown()](@ref sargs_shutdown) - release internal parsing state.
- [sargs_isvalid()](@ref sargs_isvalid) - check whether setup succeeded.
- [sargs_num_args()](@ref sargs_num_args) - number of parsed key-value entries.
- [sargs_key_at()](@ref sargs_key_at) - key string at a specific parsed argument index.
- [sargs_value_at()](@ref sargs_value_at) - value string at a specific parsed argument index.

## Lookup helpers

- [sargs_find()](@ref sargs_find) - look up the index of a key in the parsed argument table.
- [sargs_exists()](@ref sargs_exists) - test whether a flag or key appears in the parsed arguments.
- [sargs_value()](@ref sargs_value) - fetch the value for a key or `NULL` if it was not provided.
- [sargs_value_def()](@ref sargs_value_def) - fetch a value with a caller-provided fallback.
- [sargs_equals()](@ref sargs_equals) - compare a parsed value against a string literal.
- [sargs_boolean()](@ref sargs_boolean) - interpret a parsed value as a boolean convenience flag.
