### 0.2.0 (2016-7-9)

##### Chores

* **cleanup:** Removed trailing spaces ([2fc11a97](https://github.com/fvdm/nodejs-toonapi/commit/2fc11a973cfa7d90efccfd2d3538f82da454acc5))
* **methods:** Renamed method function names ([54062313](https://github.com/fvdm/nodejs-toonapi/commit/54062313abc412a3810db64922f22571dcedf17d))

##### Documentation Changes

* **readme:**
  * Added beta notice ([ffa2dc27](https://github.com/fvdm/nodejs-toonapi/commit/ffa2dc27d964dd30f08c4965b46be66209fd8bd3))
  * Added basic readme ([f2486de4](https://github.com/fvdm/nodejs-toonapi/commit/f2486de4702b2cfc470e5913363305153a6b88d5))

##### New Features

* **errors:** Added error endpoint missing ([d19659a4](https://github.com/fvdm/nodejs-toonapi/commit/d19659a4ebf5e215de2961129f41745dd671c4df))
* **oauth:** Added method getTokenFromPassword ([5252d4ba](https://github.com/fvdm/nodejs-toonapi/commit/5252d4ba993625f34d03e5eaef7be1b808eb5d6f))
* **setup:** Added username and password settings ([d1d2e921](https://github.com/fvdm/nodejs-toonapi/commit/d1d2e9219ebbe66d24142c0e24ed014d9764fb3c))

##### Bug Fixes

* **pushEvent:** Fixed bad request path ([93e8b81c](https://github.com/fvdm/nodejs-toonapi/commit/93e8b81cb1152bf9e6b3c8368c50a0b3606b2160))
* **devices:** Fixed bad request path ([56c9d986](https://github.com/fvdm/nodejs-toonapi/commit/56c9d986b6300924d129d95cf8ccb24c52ddbf84))
* **consumption:** Fixed bad request path ([1411fca1](https://github.com/fvdm/nodejs-toonapi/commit/1411fca1a09e6b8b6ac93a572affe8ca5af87952))
* **temperature:** Fixed request paths ([cb07a91b](https://github.com/fvdm/nodejs-toonapi/commit/cb07a91b76369bebfc7f34b92bddb6880eff2a86))
* **errors:** Fixed missing body for invalid response ([3de07430](https://github.com/fvdm/nodejs-toonapi/commit/3de07430f789275fc9b14e36fc0acf96737161a1))
* **display:** Fixed status API path ([1bc3088c](https://github.com/fvdm/nodejs-toonapi/commit/1bc3088c62204b3221581501e7f15486ca83c97e))
* **oauth:** Disable Authorization header ([35ff3a9b](https://github.com/fvdm/nodejs-toonapi/commit/35ff3a9b77d2fdcbdd9857ae6fb5d468c1118ab5))
* **response:**
  * Added /revoke handling ([a8d9fe9f](https://github.com/fvdm/nodejs-toonapi/commit/a8d9fe9fd5e775df01a50b83a517eb8edc78349e))
  * Parse XML error from API ([046f931b](https://github.com/fvdm/nodejs-toonapi/commit/046f931b05709e36aa36317269cdbde8a8b5e0c3))
* **setup:** Fixed fatal error when object is missing ([3b4930d6](https://github.com/fvdm/nodejs-toonapi/commit/3b4930d6a323196474cc5f8366770c3521aa1c21))
* **methods:** Fixed agreements API path ([6e57de0d](https://github.com/fvdm/nodejs-toonapi/commit/6e57de0d5a5cfe55ff9788ee9fe372cd3dd3a3bb))
* **reponse:** Consistent return ([a03c3ead](https://github.com/fvdm/nodejs-toonapi/commit/a03c3ead066e2b8ac0b38c5c126338b21f2841f3))

##### Refactors

* **main:**
  * Moved methods to app object ([9ffdfa6a](https://github.com/fvdm/nodejs-toonapi/commit/9ffdfa6a7b5b523033addae5ccfa18ae3a17cb31))
  * Removed unavailable agreements.update method ([fdb595ba](https://github.com/fvdm/nodejs-toonapi/commit/fdb595ba1f8c4ed97e4ba9cd1da04957ef47c381))
  * Cleaner object props assignment ([152dd2d7](https://github.com/fvdm/nodejs-toonapi/commit/152dd2d728c78cb5f98c0c53eb361cbafa15099e))
* **temperature:** Removed method temperature.update ([e8d9b02d](https://github.com/fvdm/nodejs-toonapi/commit/e8d9b02d04884f6a5ef7ae08d2fe407e3b11cab6))
* **errors:**
  * Removed xml <ams:fault> parsing ([e59c14b5](https://github.com/fvdm/nodejs-toonapi/commit/e59c14b580601fd294c5482ef99d4fe5b845a914))
  * Rewrite doError() with optional callback ([b76819d5](https://github.com/fvdm/nodejs-toonapi/commit/b76819d5f9a383ee005dd004bda5164d3ca67bdf))
  * Add headers and statusCode when response data ([ad11a91f](https://github.com/fvdm/nodejs-toonapi/commit/ad11a91f2bb9071d6598ec393c39b3e18fe3ccb1))
  * Process API errors in doErrors() ([180589ef](https://github.com/fvdm/nodejs-toonapi/commit/180589ef2e8a6d8f4915fc7fa4606fbcd29f4901))
  * Handle res details in doError() ([86d653a4](https://github.com/fvdm/nodejs-toonapi/commit/86d653a4abb39652ac30b8ed3e80071d8bab0708))
  * Moved errors to dedicated function ([d753afa4](https://github.com/fvdm/nodejs-toonapi/commit/d753afa4cab121c79a6891490de964e18c434cdf))
* **request:**
  * Added setting to disable Authorization header ([81c93781](https://github.com/fvdm/nodejs-toonapi/commit/81c93781346adca320d35cf0c9531942179a3fbc))
  * Added request headers setting ([bc5244af](https://github.com/fvdm/nodejs-toonapi/commit/bc5244aff3a8a4224680fd79ebc62e70bcca7ca2))
* **oauth:**
  * Refresh and revoke tokens are required ([3dae02fc](https://github.com/fvdm/nodejs-toonapi/commit/3dae02fc9a530442302d47f4590119a18ec2192e))
  * Removed methods that are not ready ([b9ad921f](https://github.com/fvdm/nodejs-toonapi/commit/b9ad921f3f99f93ab63a5ac7942fd088eaa7981f))
  * Clean up getToken ([bf683d34](https://github.com/fvdm/nodejs-toonapi/commit/bf683d3476f7e05e41125107b225f1a8da423486))
* **methods:** Split agreements into .list and .update ([aedd23a6](https://github.com/fvdm/nodejs-toonapi/commit/aedd23a6e87751daafa406954855ce04e0146a2a))

##### Code Style Changes

* **methods:** Method .agreements clean up ([c1e0b599](https://github.com/fvdm/nodejs-toonapi/commit/c1e0b5994cacddbb4c571c74b7157aaa60c366af))

##### Tests

* **main:**
  * Added method display.status ([abe9c500](https://github.com/fvdm/nodejs-toonapi/commit/abe9c500bbc69bd38eac2ddedea62a31b80a038d))
  * Added method agreements.list ([09143c04](https://github.com/fvdm/nodejs-toonapi/commit/09143c04d229410e3bbc49b148cee3daddfd1eb1))
  * Reload toonapi with new config ([4899e721](https://github.com/fvdm/nodejs-toonapi/commit/4899e721559821fadb3878785a4e5fabe8883f52))
  * Added method oauth.revokeToken ([10117971](https://github.com/fvdm/nodejs-toonapi/commit/10117971fd322b2abd4e96783ea6660f68a32a06))
  * Added method oauth.refreshToken ([41900b1c](https://github.com/fvdm/nodejs-toonapi/commit/41900b1c9dfc0751b26d15aa28b68642018500ec))
  * Store accessToken and refreshToken ([68725dd2](https://github.com/fvdm/nodejs-toonapi/commit/68725dd2e222a5d2a7bf69d766d553a57dd74a99))
  * Fixed label typo ([0660c41c](https://github.com/fvdm/nodejs-toonapi/commit/0660c41c3814a2cd06e48afe896ab7fd84e5c5c3))
  * Timeout error use normal endpoint ([a6320aac](https://github.com/fvdm/nodejs-toonapi/commit/a6320aac0e6cf5f018eed4278b3ed3eb9b2d54b4))
  * Renamed API error to API error - xml <ams:fault> ([fd2badbe](https://github.com/fvdm/nodejs-toonapi/commit/fd2badbea7c091e280d5561de75eec1580e0d195))
  * Added API error - xml <fault> ([ddaa5f6f](https://github.com/fvdm/nodejs-toonapi/commit/ddaa5f6ff72be5f3d655e78d3e6a3486e1637f89))
  * Added method oauth.getTokenFromPassword ([7e077aba](https://github.com/fvdm/nodejs-toonapi/commit/7e077abad97dc0e442cb8b17c99027489e4df384))
  * Added env vars for username and password ([6b7f6fc4](https://github.com/fvdm/nodejs-toonapi/commit/6b7f6fc46201cfe0b03d3274ce8ca0c12b067c63))
  * Added more env vars ([65d57b8c](https://github.com/fvdm/nodejs-toonapi/commit/65d57b8c3bf6a5e568a84f2e22580fe7970aa6aa))
  * Check if API error.error is an object ([401087a4](https://github.com/fvdm/nodejs-toonapi/commit/401087a49b5848984bb8e9c1ca89eaca15c22d17))
  * Added timeout error ([36d3fe69](https://github.com/fvdm/nodejs-toonapi/commit/36d3fe69759bbf867519e32e3b982a776ff7d253))
  * Added API error ([c8a9dde7](https://github.com/fvdm/nodejs-toonapi/commit/c8a9dde75b71c939193394ab8528669b2023d010))
* **lint:** Updated eslint config to ES6 ([dfa93165](https://github.com/fvdm/nodejs-toonapi/commit/dfa93165938eb439d73e475d9e9a419337ce242a))

