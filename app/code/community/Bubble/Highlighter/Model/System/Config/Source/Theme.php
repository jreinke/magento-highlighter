<?php
/**
 * @category    Bubble
 * @package     Bubble_Highlighter
 * @version     1.0.1
 * @copyright   Copyright (c) 2015 BubbleShop (https://www.bubbleshop.net)
 */
class Bubble_Highlighter_Model_System_Config_Source_Theme
{
    public function toOptionArray()
    {
        $io = new Varien_Io_File();
        $io->cd(Mage::getBaseDir() . DS . 'js' . DS . 'codemirror' . DS . 'theme');
        $files = $io->ls(Varien_Io_File::GREP_FILES);
        $options = array(
            array(
                'value' => 'default',
                'label' => 'default',
            )
        );
        foreach ($files as $file) {
            $theme = pathinfo($file['text'], PATHINFO_FILENAME);
            $options[] = array(
                'value' => $theme,
                'label' => $theme,
            );
        }

        return $options;
    }
}