const React = novi.react.React;
import LinkEditor from "./LinkEditor";
import LinkSettings from "./LinkSettings";
import * as ExcerptFunction from "./ExcerptFunction"; 
const Language = novi.language;
const Plugin = {
    name: "novi-plugin-link",
    title: "Novi Link",
    description: "Novi Link description",
    version: "1.0.4",
    dependencies: {
        novi: "0.8.6"
    },
    defaults: {
        querySelector: "a[href]"
    },
    ui: {
        editor: [LinkEditor],
        settings: <LinkSettings />,
    },
    excerpt: ExcerptFunction.isLinkReplaceble,
    onLanguageChange: onLanguageChange
};
function onLanguageChange(plugin){
    let messages = Language.getDataByKey("novi-plugin-link");
    plugin.ui.editor[0].title = messages.editor.title;
    plugin.ui.editor[0].tooltip = messages.editor.tooltip;
    return plugin;
}
novi.plugins.register(Plugin);