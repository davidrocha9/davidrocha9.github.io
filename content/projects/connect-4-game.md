---
title: "Connect 4 Game with C++ SDL2 and Minimax"
date: 2024-08-13
description: "A Connect 4 game developed using C++ with SDL2 for graphics and Minimax algorithm for AI."
---

## About

You can the source code for this project [here](https://github.com/davidrocha9/connect-four-game).

## Setup Instructions

### Prerequisites

- **C++ Compiler**: A modern C++ compiler (e.g., GCC, Clang, MSVC).
- **SDL2 Library**: Install the SDL2 library. You can download it from [SDL2's official website](https://www.libsdl.org/download-2.0.php).

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/davidrocha9/connect-four-game.git
   cd connect-four-game
   ```

2. **Install SDL2**

   **On Ubuntu/Debian:**

   ```bash
   sudo apt-get install libsdl2-dev
   ```

   **On macOS (using Homebrew):**

   ```bash
   brew install sdl2
   ```

   **On Windows:**
   Download the SDL2 development libraries from the [SDL2 download page](https://www.libsdl.org/download-2.0.php) and follow the instructions for setting up SDL2 with your IDE.

3. **Build the Project**

   ```bash
   mkdir build
   cd build
   cmake ..
   make
   ```

4. **Run the Game**

   ```bash
   ./Connect4Game
   ```

## AI Implementation

The AI uses the Minimax algorithm to evaluate possible moves and choose the optimal one. The algorithm considers the current game state, simulates potential future moves, and selects the move that maximizes the AI’s chances of winning while minimizing the player’s chances.

## Screenshots

![Screenshot](assets/screenshot1.png)
![Screenshot](assets/screenshot2.png)
