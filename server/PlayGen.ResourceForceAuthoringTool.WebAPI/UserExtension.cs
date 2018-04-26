using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using PlayGen.ResourceForceAuthoringTool.Contracts;
using PlayGen.ResourceForceAuthoringTool.Data.Model;
using Newtonsoft.Json.Linq;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    public static class UserExtension
    {
        class Metadata
        {
            public Metadata(string json)
            {
                JObject jObject = JObject.Parse(json);
                Username = (string)jObject["username"];
                Password = (string)jObject["password"];
                MemberType = (string)jObject["memberType"];
				AllowedLocations = (string)jObject["allowedLocations"];
            }

            public int Id { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
            public string MemberType { get; set; }
            public string AllowedLocations { get; set; }
        }

        public static UserMetadataResponse ToMetadata(this User userModel)
        {
            if (userModel == null)
            {
                return null;
            }

			return new UserMetadataResponse
            {
                Id = userModel.Id,
                Username = userModel.Username,
                MemberType = userModel.MemberType,
				AllowedLocations = userModel.AllowedLocations,
            };
        }

        public static IEnumerable<UserMetadataResponse> ToMetadataList(this IEnumerable<User> userModels)
        {
            return userModels.Select(ToMetadata).ToList();
        }

        public static User ToUserModel(this UserRequest userContract)
        {
            var metadata = new Metadata(userContract.Metadata.ToString());
            return new User
            {
                Username = metadata.Username,
                Password = metadata.Password,
                MemberType = "member",
				AllowedLocations = ""
            };
        }

        public static UserResponse ToUserContract(this User userContract)
        {
            if (userContract == null)
            {
                return null;
            }

            return new UserResponse
            {
                Metadata = userContract.ToMetadata(),
            };
        }

        
    }
}
