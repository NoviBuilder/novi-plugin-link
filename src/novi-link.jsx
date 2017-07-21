const React = novi.react.React;
import LinkEditor from "./LinkEditor";
import LinkSettings from "./LinkSettings";
import * as ExcerptFunction from "./ExcerptFunction"; 

const Plugin = {
    name: "novi-plugin-link",
    title: "Novi Link",
    description: "Novi Link description",
    version: "1.0.3",
    dependencies: {
    },
    defaults: {
        querySelector: "a[href]"
    },
    ui: {
        editor: [LinkEditor],
        settings: <LinkSettings />,
    },
    excerpt: ExcerptFunction.isLinkReplaceble
};

novi.plugins.register(Plugin);