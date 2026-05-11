@page guide_audio sokol_audio.h Guide

Quick entry points for `sokol_audio.h`.

See also: [file reference](sokol__audio_8h.html), [project README](md__r_e_a_d_m_e.html)

## Setup and shutdown

- [saudio_setup()](@ref saudio_setup) - initialize audio playback and choose callback-driven or push-model streaming.
- [saudio_shutdown()](@ref saudio_shutdown) - shut down the audio subsystem and release backend resources.
- [saudio_isvalid()](@ref saudio_isvalid) - check whether audio initialization succeeded.
- [saudio_query_desc()](@ref saudio_query_desc) - inspect the effective setup descriptor with defaults applied.
- [saudio_userdata()](@ref saudio_userdata) - fetch the user-data pointer supplied in `saudio_desc`.

## Push-model audio

- [saudio_expect()](@ref saudio_expect) - query how many frames the backend would currently like to receive.
- [saudio_push()](@ref saudio_push) - push interleaved sample frames into the FIFO in push mode.

## Stream properties

- [saudio_sample_rate()](@ref saudio_sample_rate) - runtime sample rate of the output stream.
- [saudio_channels()](@ref saudio_channels) - runtime number of output channels.
- [saudio_buffer_frames()](@ref saudio_buffer_frames) - size of the backend FIFO in frames.
- [saudio_suspended()](@ref saudio_suspended) - check whether playback is currently suspended by the platform.
