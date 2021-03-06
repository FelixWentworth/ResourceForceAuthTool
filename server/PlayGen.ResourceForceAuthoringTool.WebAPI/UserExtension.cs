﻿using System;
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
                ContentRegions = (string)jObject["contentRegions"];
                ValidationRegions = (string)jObject["validationRegions"];
            }

            public int Id { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
            public string MemberType { get; set; }
            public string ContentRegions { get; set; }
            public string ValidationRegions { get; set; }
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
                ContentRegions = userModel.ContentRegions,
                ValidationRegions = userModel.ValidationRegions
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
				ContentRegions = "",
                ValidationRegions = "[]"
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
