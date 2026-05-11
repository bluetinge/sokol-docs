@page guide_time sokol_time.h Guide

Quick entry points for `sokol_time.h`.

See also: [file reference](sokol__time_8h.html), [project README](md__r_e_a_d_m_e.html)

## Timestamps and deltas

- [stm_setup()](@ref stm_setup) - initialize the platform timer frequency.
- [stm_now()](@ref stm_now) - capture the current high-resolution timestamp.
- [stm_diff()](@ref stm_diff) - compute the delta between two timestamps.
- [stm_since()](@ref stm_since) - compute the elapsed ticks since a start timestamp.
- [stm_laptime()](@ref stm_laptime) - compute elapsed ticks and reset the stored start time in one step.

## Unit conversion

- [stm_sec()](@ref stm_sec) - convert timer ticks to seconds.
- [stm_ms()](@ref stm_ms) - convert timer ticks to milliseconds.
- [stm_us()](@ref stm_us) - convert timer ticks to microseconds.
- [stm_ns()](@ref stm_ns) - convert timer ticks to nanoseconds.

## Frame pacing helpers

- [stm_round_to_common_refresh_rate()](@ref stm_round_to_common_refresh_rate) - snap a measured duration to a nearby common display refresh interval.
