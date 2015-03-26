var BubbleHighlighter = Class.create();
BubbleHighlighter.prototype = {
    initialize: function(options) {
        this.options = Object.extend({
            theme:          'default',
            indentUnit:     4,
            lineNumbers:    true,
            lineWrapping:   true,
            autoCloseTags:  true,
            wysiwygEnabled: false
        }, options || {});
    },
    setup: function(cm, textarea) {
        cm.getWrapperElement().toggle();
        // Update doc content
        cm.getDoc().setValue(textarea.value);
        // Reindent code
        this.autoIndent(cm);
    },
    find: function() {
        $$('.show-hide').each(function(el) {
            if (!el.id) return;
            var textarea = $(el.id.replace('toggle', ''));
            this.create(textarea);
        }.bind(this));
    },
    create: function(textarea) {
        if (!textarea || !textarea.id || textarea.hasClassName('bubble')) return;

        var options = this.options;
        var baseId = textarea.id;
        textarea.addClassName('bubble');
        var cm = CodeMirror.fromTextArea(textarea, {
            mode:           'htmlmixed',
            theme:          options.theme,
            indentUnit:     options.indentUnit,
            lineNumbers:    options.lineNumbers,
            lineWrapping:   options.lineWrapping,
            autoCloseTags:  options.autoCloseTags,
            extraKeys: {
                Tab: function(cm) {
                    if (cm.somethingSelected()) {
                        cm.indentSelection('add');
                    } else {
                        var spaces = [ cm.getOption('indentUnit') + 1 ].join(' ');
                        cm.replaceSelection(spaces, 'end', '+input');
                    }
                },
                'Shift-Tab': 'indentLess'
            }
        });

        // Any change on CM is cloned to default textarea
        cm.on('change', function (cm) {
            cm.save();
        });

        // When losing focus on CM, update last caret position to insert potential code at the right position
        cm.on('blur', function (cm) {
            var start = 0;
            var col = cm.getDoc().getCursor().ch;
            var line = cm.getDoc().getCursor().line;
            for (var i = 0; i < line; i++) {
                start += cm.getLine(i).length;
            }
            start += line;
            start += col;
            textarea.selectionStart = start;
            textarea.selectionEnd = start;
        });

        // Refresh CM when clicking on Content tab, if not CM is not rendered properly
        if ($('page_tabs_content_section')) {
            $('page_tabs_content_section').observe('click', function() {
                cm.refresh();
                this.autoIndent(cm);
                if ($('page_content_tbl')) {
                    cm.getWrapperElement().hide();
                }
            }.bind(this));
        }

        // Handle insert widget and image buttons
        varienGlobalEvents.attachEventHandler('tinymceChange', function() {
            var content = '';
            if (typeof(tinyMCE) !== 'undefined' && tinyMCE.activeEditor) {
                content = tinyMCE.activeEditor.getContent();
            } else {
                content = textarea.value;
            }
            var wysiwyg = $('wysiwyg' + baseId);
            if (wysiwyg && typeof(wysiwyg) !== 'undefined') {
                content = wysiwyg.decodeDirectives(content);
            }
            cm.getDoc().setValue(content);
        });

        // Handle insert variable button
        Windows.addObserver({
            onShow: function() {
                $$('#variables-chooser a').each(function(link) {
                    link.observe('click', function() {
                        cm.getDoc().setValue(textarea.value);
                    });
                });
            }
        });

        // Update CodeMirror when showing or hiding WYSIWYG
        var toggle = $('toggle' + baseId);
        if (toggle) {
            toggle.observe('click', function() {
                cm.getWrapperElement().toggle();
                // Update doc content
                cm.getDoc().setValue(textarea.value);
                // Reindent code
                this.autoIndent(cm);
            }.bind(this));
        }

        $$('.form-buttons button.save').invoke('observe', 'click', function() {
            this.setup(cm, textarea);
        }.bind(this));

        // If textarea is hidden, we can't set cursor position into it
        textarea.setStyle({
            display: 'block',
            position: 'absolute',
            top: '-10000px'
        });

        // Define a custom border for editor
        cm.getWrapperElement().setStyle({ border: '1px solid #ccc' });

        if (options.wysiwygEnabled) {
            this.setup(cm, textarea);
        }
    },
    autoIndent: function(cm) {
        var last = cm.lineCount();
        cm.operation(function() {
            for (var i = 0; i < last; ++i) {
                cm.indentLine(i);
            }
        });
    }
};