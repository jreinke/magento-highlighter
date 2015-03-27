<?php
/**
 * @category    Bubble
 * @package     Bubble_Highlighter
 * @version     1.1.0
 * @copyright   Copyright (c) 2015 BubbleShop (https://www.bubbleshop.net)
 */
class Bubble_Highlighter_Block_Adminhtml_Highlighter extends Mage_Adminhtml_Block_Template
{
    public function isCodeMirrorEnabled()
    {
        return Mage::getStoreConfigFlag('bubble_highlighter/codemirror/enable');
    }

    public function getIndentUnit()
    {
        $config = Mage::getStoreConfig('bubble_highlighter/codemirror/indent_unit');

        return $config ? abs((int) $config) : 4;
    }

    public function isLineNumbersEnabled()
    {
        return Mage::getStoreConfigFlag('bubble_highlighter/codemirror/line_numbers') ? 'true' : 'false';
    }

    public function isLineWrappingEnabled()
    {
        return Mage::getStoreConfigFlag('bubble_highlighter/codemirror/line_wrapping') ? 'true' : 'false';
    }

    public function isAutoCloseTagsEnabled()
    {
        return Mage::getStoreConfigFlag('bubble_highlighter/codemirror/auto_close_tags') ? 'true' : 'false';
    }

    public function getTheme()
    {
        return Mage::getStoreConfig('bubble_highlighter/codemirror/theme');
    }

    public function isWysiwygEnabled()
    {
        $enabled = Mage_Cms_Model_Wysiwyg_Config::WYSIWYG_ENABLED;

        return Mage::getStoreConfig('cms/wysiwyg/enabled') == $enabled ? 'true' : 'false';
    }
}