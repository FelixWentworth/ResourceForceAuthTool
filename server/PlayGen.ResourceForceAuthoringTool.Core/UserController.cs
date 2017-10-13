using System;
using System.Collections.Generic;
using System.Text;

using PlayGen.ResourceForceAuthoringTool.Data.Model;

namespace PlayGen.ResourceForceAuthoringTool.Core
{
    public class UserController
    {
        private readonly Data.EntityFramework.UserController _userDbController;

        public UserController(Data.EntityFramework.UserController userDbController)
        {
            _userDbController = userDbController;
        }

        public User Create(User user)
        {
            return _userDbController.Create(user);
        }

        public User Get(string username)
        {
            return _userDbController.Get(username);
        }
    }
}
