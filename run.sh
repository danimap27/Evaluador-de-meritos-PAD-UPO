#!/bin/bash
(sleep 2 && xdg-open http://localhost:5173 2>/dev/null || open http://localhost:5173) &
npm run dev