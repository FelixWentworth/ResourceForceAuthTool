using System;
using System.Collections.Generic;
using System.Text;
using PlayGen.ResourceForceAuthoringTool.Data.Model;

namespace PlayGen.ResourceForceAuthoringTool.Core
{
    public class AccountRequestController
    {
        private readonly Data.EntityFramework.AccountRequestController _accountRequestDbController;

        public AccountRequestController(Data.EntityFramework.AccountRequestController accountRequestDbController)
        {
            _accountRequestDbController = accountRequestDbController;
        }

        public AccountRequest Create(AccountRequest request)
        {
            return _accountRequestDbController.Create(request);
        }

        public AccountRequest Get(int id)
        {
            return _accountRequestDbController.Get(id);
        }

        public AccountRequest Get(int playerId, string region)
        {
            return _accountRequestDbController.Get(playerId, region);
        }

        public List<AccountRequest> Get()
        {
            return _accountRequestDbController.Get();
        }

        public List<AccountRequest> GetPlayerRequests(int playerId)
        {
            return _accountRequestDbController.GetForPlayer(playerId);
        }

        public List<AccountRequest> Get(string region)
        {
            return _accountRequestDbController.Get(region);
        }

        public void Update(string region, AccountRequest request)
        {
            _accountRequestDbController.Update(region, request);
        }

        public void Delete(int id)
        {
            _accountRequestDbController.Delete(id);
        }
    }
}
