# Lanyard-Clone
My some-what half-arsed attempt to replicate what Lanyard does.

This was a hobby-type project to see if I could make a clone version of [Lanyard](https://github.com/phineas/lanyard) which this was heavily inspired by.) 

## Acknowledgements
- [Phineas](https://github.com/phineas) for inspiring me to branch out to attempt replicate his project in NodeJS.

*Prewarning: this is not made for full-scale usage, as in it can't be sharded unless heavily modified*

## Modify `config.js` which can be found in `settings` and add your bot token. 
```js
exports.config = [
  {
    token: "",
    activity: "Lanyard-Clone",
  },
];
```
