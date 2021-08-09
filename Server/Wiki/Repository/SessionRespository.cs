using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Wiki.ViewModels;

namespace Wiki.Repository
{
    public static class SessionRespository
    {
        public static void SetSessionUserId(this ISession session, string key, string value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
        }
        public static string GetSessionUserId(this ISession session, string key)
        {
            var value = session.GetString(key);
            var v= value == null ? default : JsonSerializer.Deserialize<string>(value);
            return v;
        }
    }
}
