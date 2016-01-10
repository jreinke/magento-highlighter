<?php
/**
 * @category    Bubble
 * @package     Bubble_Highlighter
 * @version     1.2.0
 * @copyright   Copyright (c) 2016 BubbleShop (https://www.bubbleshop.net)
 */
class Bubble_Highlighter_Model_Observer
{
    public function includeCodeMirrorTheme()
    {
        /** @var Mage_Adminhtml_Block_Page_Head $head */
        if ($head = Mage::app()->getLayout()->getBlock('head')) {
            $theme = Mage::getStoreConfig('bubble_highlighter/codemirror/theme');
            if ($theme != 'default') {
                $head->addItem('js_css', 'codemirror/theme/' . $theme . '.css');
            }
        }
    }
}