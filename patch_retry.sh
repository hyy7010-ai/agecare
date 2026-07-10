#!/bin/bash
sed -i -e '/if (!isQuota && !isOverloaded) throw e;/a\        if (isQuota) {\n          throw new Error("AI API rate limit (quota) exceeded. Please check your billing details or try again later.");\n        }' server.ts
