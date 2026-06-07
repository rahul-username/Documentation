import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Quality knobs — higher CRF range for crisp gradients/grain.
Config.setCodec("h264");
Config.setCrf(18);
// Required for WebGL / Three.js rendering in headless Chromium.
Config.setChromiumOpenGlRenderer("angle");
