# Restux

An attempt at using decorators to create a "store- and actionless" flux library geared towards restful endpoints.

Main idea is to inject a Restux instance to all @Endpoint's and create "stores" from information supplied to @Endpoint(['events']) decorator.

The Restux instance acts both as stores and actions.

Experimental... I'm not too sure about the whole thing.
