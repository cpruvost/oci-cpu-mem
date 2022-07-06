#!/bin/bash
set -e

echo "::debug::Set the Output Variable"
echo "::set-output name=some_output::$1"
