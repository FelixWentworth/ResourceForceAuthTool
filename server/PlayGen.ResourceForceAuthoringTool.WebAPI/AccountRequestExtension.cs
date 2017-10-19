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
                MemberType = (string)jObject["memberType"];
                Languages = (string)jObject["languages"];
                Locations = (string)jObject["locations"];
                Reason = (string)jObject["reason"];
            }

            public int Id { get; set; }
            public int PlayerId{ get; set; }
            public string MemberType { get; set; }
            public string Languages { get; set; }
            public string Locations { get; set; }
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
                MemberType = requestModel.MemberType,
                Languages = requestModel.Languages,
                Locations = requestModel.Locations,
                Reason = requestModel.Reason
            };
        }

        public static AccountRequest ToAccountRequestModel(this AccountChangeRequest accountContract)
        {
            var metadata = new Metadata(accountContract.Metadata.ToString());
            return new AccountRequest()
            {
                PlayerId = metadata.PlayerId,
                MemberType = metadata.MemberType,
                Languages = metadata.Languages,
                Locations = metadata.Locations,
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
