using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using PlayGen.ResourceForceAuthoringTool.Contracts;
using PlayGen.ResourceForceAuthoringTool.Data.Model;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    public static class AccountRequestExtension
    {
        class Metadata
        {
            public Metadata(string json)
            {
                JObject jObject = JObject.Parse(json);
                PlayerId = (int)jObject["playerId"];
	            Username = (string) jObject["username"];
                MemberType = (string)jObject["memberType"];
                Language = (string)jObject["language"];
                Location = (string)jObject["location"];
                Reason = (string)jObject["reason"];
            }

            public int Id { get; set; }
            public int PlayerId{ get; set; }
			public string Username { get; set; }
            public string MemberType { get; set; }
            public string Language { get; set; }	
            public string Location { get; set; }
            public string Reason { get; set; }
        }

        public static IEnumerable<AccountChangeMetadataResponse> ToMetadataList(this IEnumerable<AccountRequest> requestModels)
        {
            return requestModels.Select(ToMetadata).ToList();
        }

        public static AccountChangeMetadataResponse ToMetadata(this AccountRequest requestModel)
        {
            if (requestModel == null)
            {
                return null;
            }

            return new AccountChangeMetadataResponse
            {
                Id = requestModel.Id,
                PlayerId = requestModel.PlayerId,
				Username = requestModel.Username,
                MemberType = requestModel.MemberType,
                Language = requestModel.Language,
                Location = requestModel.Location,
                Reason = requestModel.Reason
            };
        }

        public static AccountRequest ToAccountRequestModel(this AccountChangeRequest accountContract)
        {
            var metadata = new Metadata(accountContract.Metadata.ToString());
            return new AccountRequest()
            {
                PlayerId = metadata.PlayerId,
				Username = metadata.Username,
                MemberType = metadata.MemberType,
                Language = metadata.Language,
                Location = metadata.Location,	
                Reason = metadata.Reason
            };
        }

        public static AccountChangeResponse ToAccountResponse(this AccountRequest accountContract)
        {
            return new AccountChangeResponse()
            {
                Metadata = accountContract.ToMetadata()
            };
        }
    }
}
