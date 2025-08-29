# Ice and Snow Invitational Exhibition

## Goal: A digital display but output to A3 poster (2480 x 3508 pixels at 300 DPI) 

## Note: Be related to other artworks so it could be part of a bigger project 

## Guideline: 
    - Style guide:
        - Canvas for the drawing content: 2480 x 3508 pixels
        - Background: Black 
        - Content: White
        - Font style: Still deciding from these two. 
        - Font family: 
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Jersey+10&display=swap" rel="stylesheet">
    - Input from:
        - This time: a pre-saved context: IceNSnow_text.txt
        - Art Project: User input. (Using user text or voice input, module already in Voice connecter poster project)
    - API: 
        - Physic simulation with matter.js
    - Procedure:
    All the hard-coded numeric value below can be central-controlled in the JSON file: config.json
        - Module 0: Position Calculator:
        Calculate the position for the drop:
            Precalculation:
                - For all possible ASCII input (32 to 126), precalculate the x position for each to drop from the top of the canvas (y=0). 
                - For each ASCII position, starting at 0, it should be 100 pt away from the neighbors
                - When get to the border of the canvas, go back to the other direction (i.e.: calculation get position at x=2490 pt, then it should be at x= 2470pt), until all ASCII (32-126) positions are determined. 
                - Save in a dictionary for quick lookup for rendering
            For ASCII 32 to 126:
                - Get the position from the precalculation above, add a small noise to the x position (around -20 to +20 Add % 2480 to check for out of boundary)
            For char not in 32-126:
                Give it a random x position range from 0 to 2480

        - Module 1: background renderer:
        Render the background using the input:
            - From top right.
            - Toggle Text Orientation to be vertical (char by char from top to bottom)
            - Font size 60 pt, leading 48 pt (textLeading).
            - New line for every comma, or period. (Add numeric checker when see period, to rule out period for decimal expression)

        - Module 2: char dropper:
        Drop the chars from the top:
            - Read the input (this time, from the local file: IceNSnow_text.txt)
            - For each char, Get the position from Module 0
            - treat each char as a physical object, using matter.js, drop it with a random rotation of the char between (-+ 60 degree)
            - chars will land on the floor (y = 3508), and starting to stack on each other
        About the physic of the characters dropping:
            - The world has bottom as floor, and char drop from top to bottom under effect of 'gravity'
            - By using matter.js, each char should be treated as a physical body, and chars will stack on each other in y direction, sometimes rotate because the difference in shape
            
        - Module 3: crystalizer:
        Crystalize the same chars that stick together (char finished dropping):
            - For each char finished dropping, run the crystalization check
            - If there are same chars (same ASCII code) touches (physics), add very thick lines (8 pt) to connect all the same chars
        
        - Module 4: debug UI:
        For debug and Admin control:
            - show font used
            - button for export current snapshot of poster (dont include this UI in poster export)
            - control to only run background render, only dropper, only dropper+ crystalizer, or all