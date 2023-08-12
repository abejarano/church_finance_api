from django.utils.translation import activate, gettext_lazy as _


class LanguageMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        language = request.META.get('HTTP_ACCEPT_LANGUAGE')
        if language:
            language = language.split(',')[0][:2]
            if language in ['es', 'pt']:
                activate(language)
            else:
                activate('en')
        else:
            activate('en')

        return self.get_response(request)
