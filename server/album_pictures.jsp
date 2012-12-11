<% response.setContentType("text/javascript"); %>
<%= request.getParameter("callback") %>(
{ "success":true, "pictures":[
<%
int offset = 0, length = 20;

String offsetParameter = request.getParameter("offset"), lengthParameter = request.getParameter("length");

if (offsetParameter != null) {
	offset = Integer.parseInt(offsetParameter);
} 

if (lengthParameter != null) {
	length = Integer.parseInt(lengthParameter);
} 

for (int i = 0; i < length; i++) {
%>
	{ "picture_id":"<%= offset + i %>", "picture_url":"http://tordin.fortis4.com/ptphotos/server/images/pic<%= i %>.jpg", "thumb_url":"http://tordin.fortis4.com/ptphotos/server/images/pic<%= i %>.jpg", date:"2012-08-23" },
<%
}
%>
] }
)
