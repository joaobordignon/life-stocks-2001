import curses
import time

ASCII_ART = [
    "         ___      ___   _______  _______   ",
    "        |   |    |   | |       ||       |  ",
    "        |   |    |   | |   ___||   ___|  ",
    "        |   |    |   | |   |___ |   |___   ",
    "        |   |___ |   | |   ___||   ___|  ",
    "        |       ||   | |   |    |   |___   ",
    "        |_______||___| |___|    |_______|  ",
    " _______  _______  _______  _______  ___   _   _______             ",
    "|       ||       ||       ||       ||   | | |  |       |           ",
    "|  _____||_     _||   _   ||       ||   |_| |  |  _____|           ",
    "| |_____   |   |  |  | |  ||       ||      _|  | |_____            ",
    "|_____  |  |   |  |  |_|  ||      _||     |_   |_____  |           ",
    " _____| |  |   |  |      ||     |_ |    _  |   _____| |            ",
    "|_______|  |___|  |_______||_______||___| |_|  |_______|           ",
    "         _______  _______  _______  ____   ",
    "        |       ||  _   ||  _   ||    |  ",
    "        |____   || | |  || | |  | |   |  ",
    "         ____|  || | |  || | |  | |   |  ",
    "        | ______|| |_|  || |_|  | |   |  ",
    "        | |_____ |      ||      | |   |  ",
    "        |_______||_______||_______| |___|  "
]

POST_LINES = [
    "Award Modular BIOS v4.51PG, An Energy Star Ally",
    "Copyright (C) 1984-98, Award Software, Inc.",
    "W6168MS V1.3  111700",
    "PENTIUM III-MMX CPU at 500 MHz , Host Bus 100MHz",
    "Memory Test : 393216K OK",
    "",
    "Award Plug and Play BIOS Extension v1.0A",
    "Copyright (C) 1998, Award Software, Inc.",
    "  Detecting IDE Primary Master ... 8GB_CD00",
    "  Detecting IDE Primary Slave ... None",
    "  Detecting IDE Secondary Master... None",
    "  Detecting IDE Secondary Slave ... None",
    "",
    "Floppy disk(s) fail (40)",
    "CMOS checksum error - Defaults loaded",
    "",
    "Press F1 to continue, DEL to enter SETUP",
    ""
]

def draw_post_screen(stdscr):
    stdscr.clear()
    curses.curs_set(0)
    height, width = stdscr.getmaxyx()
    
    # Art area — start at right side (e.g., 60% of width)
    art_start_col = width // 2   # You can fine-tune to width*3//5 for even further right
    
    # Pick greatest of art height and info height for clean vertical centering
    max_lines = max(len(ASCII_ART), len(POST_LINES))
    
    # Vertical offset for both, to center on screen
    vert_offset = (height - max_lines) // 2

    # Draw both art and info simultaneously
    for idx in range(max_lines):
        # Draw POST info
        if idx < len(POST_LINES):
            stdscr.addstr(vert_offset + idx, 2, POST_LINES[idx])
        # Draw ASCII art
        if idx < len(ASCII_ART):
            stdscr.addstr(vert_offset + idx, art_start_col, ASCII_ART[idx])
        stdscr.refresh()
        time.sleep(0.15)  # stagger effect — or use different timing for each side

    # Wait for key press to proceed
    while True:
        key = stdscr.getch()
        if key == curses.KEY_F1 or key == ord('\n'):
            break

if __name__ == '__main__':
    curses.wrapper(draw_post_screen)
# To run this code, save it as boot_screen.py and execute it in a terminal that supports curses.