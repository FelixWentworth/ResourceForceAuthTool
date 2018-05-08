using Microsoft.AspNetCore.Mvc;
using PlayGen.ResourceForceAuthoringTool.Contracts;
using PlayGen.ResourceForceAuthoringTool.Core.Utilities;
using PlayGen.ResourceForceAuthoringTool.Data.EntityFramework;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    [Route("api/[controller]")]
    public class UserController
    {
        private readonly Core.UserController _userCoreController;

        public UserController(Core.UserController userCoreController)
        {
            _userCoreController = userCoreController;
        }


        #region Create

        [HttpPost]
        public IActionResult Create([FromBody]UserRequest newUser)
        {
            var user = newUser.ToUserModel();

            user.Password = PasswordEncryption.Encrypt(user.Password);

            _userCoreController.Create(user);
            var userContract = user.ToUserContract();
            return new ObjectResult(userContract);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]UserRequest currentUser)
        {
            var userModel = currentUser.ToUserModel();

            // Get the current user
            var user = _userCoreController.Get(userModel.Username);

            if (user != null && PasswordEncryption.Verify(userModel.Password, user.Password))
            {
                var metadata = user.ToMetadata();
                return new ObjectResult(metadata);
            }
            throw new AuthenticationException("Unable to log in, username or password is incrrect");
        }

        #endregion

        #region Read

        #endregion

        #region UpdateAndSubmitExisting

        #endregion

        #region Delete

        #endregion
    }
}
