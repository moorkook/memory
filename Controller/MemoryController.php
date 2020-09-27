<?php

    namespace Controller;

    class MemoryController extends Controller
    {
        
        public function view() {
            echo file_get_contents('../view/memory.html');
        }
        public function scoreView() {
            echo file_get_contents('../view/score.html');
        }
    }