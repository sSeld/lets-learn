package org.jeremy.game;

import org.jeremy.engine.GameEngine;
import org.jeremy.engine.IGameLogic;


public class Main {

    /*
    Fixed Step Game Loop
     */


    public static void main(String[] args) {
        try {
            boolean vSync = true;
            IGameLogic gameLogic = new DummyGame();
            GameEngine gameEng = new GameEngine("GAME",
                    600, 480, vSync, gameLogic);
            gameEng.run();
        } catch (Exception excp) {
            excp.printStackTrace();
            System.exit(-1);
        }
    }
}
